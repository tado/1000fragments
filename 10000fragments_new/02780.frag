uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.48;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.26)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 11.04 - t * 4.69 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.60), cos(time * 1.30)) * 0.06;
	float an = atan(p.y, p.x) + time * 0.55;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.49 / 3.1415927, 0.81 / r - time * 0.56);
	tv.x += tv.y * 0.16;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.37, 0.56, 0.26) * (0.14 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.70, 0.0, 1.0);
	col = mod(col * 2.76, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
