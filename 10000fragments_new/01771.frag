uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.78;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.43)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 26.24 - t * 6.03 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.44), cos(time * 0.80)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.83 / 3.1415927, 0.71 / r + time * 1.21);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.43, 0.80, 0.78) * (0.13 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 2.08, 0.0, 1.0);
	col *= 0.87 + 0.16 * sin(gl_FragCoord.y * 2.41 + time * 16.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
