uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.46;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.68)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 16.82 - t * 4.64 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.61;
	p += vec2(0.81, 0.73) * sin(length(p) * 4.32 - time * 2.46) * 0.14;
	p.y += sin(p.x * 3.71 + time * 1.16) * 0.33;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.79));
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.57, 0.55, 0.33) * (0.19 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = fract(col * 1.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
