uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.84;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.72)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 22.42 - t * 5.19 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.77;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.07 / 3.1415927, 0.50 / r + time * 0.78);
	tv.x += tv.y * 0.45;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.18 + time * 0.11, vec3(0.56, 0.48, 0.46), vec3(0.35, 0.44, 0.47), vec3(1.17, 1.32, 0.87), vec3(0.69, 0.59, 0.32));
	col *= clamp(r * 2.28, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
