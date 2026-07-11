uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.94;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.07)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 10.58 - t * 7.18 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.61;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.41 / 3.1415927, 1.17 / r + time * 2.62);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.77 + time * 0.33, vec3(0.50, 0.41, 0.46), vec3(0.32, 0.36, 0.46), vec3(1.06, 1.16, 0.92), vec3(0.05, 0.29, 0.33));
	col *= clamp(r * 2.15, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
