uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.05;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.06)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 27.22 - t * 4.47 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.14), cos(time * 1.40)) * 0.11;
	float an = atan(p.y, p.x) + time * -0.75;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.95 / 3.1415927, 1.18 / r + time * 2.73);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.61 + time * 0.28, vec3(0.45, 0.47, 0.54), vec3(0.34, 0.49, 0.39), vec3(1.09, 1.31, 0.90), vec3(0.92, 0.97, 0.01));
	col *= clamp(r * 2.02, 0.0, 1.0);
	col = fract(col * 1.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
