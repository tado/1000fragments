uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.01;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.85)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 18.94 - t * 5.03 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.26;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.05 / 3.1415927, 1.09 / r + time * 0.71);
	tv.x += tv.y * 0.28;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.29, vec3(0.40, 0.49, 0.45), vec3(0.48, 0.31, 0.42), vec3(1.37, 1.26, 0.71), vec3(0.01, 0.31, 0.25));
	col *= clamp(r * 2.23, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
