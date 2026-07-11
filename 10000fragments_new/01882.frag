uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 4.17 * sin(t * 1.07) + t * 3.34 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.87), cos(time * 0.71)) * 0.07;
	float an = atan(p.y, p.x) + time * 0.30;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.32 / 3.1415927, 0.52 / r - time * 1.98);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.25, vec3(0.49, 0.49, 0.52), vec3(0.41, 0.33, 0.31), vec3(0.73, 1.30, 0.94), vec3(0.90, 0.50, 0.78));
	col *= clamp(r * 1.07, 0.0, 1.0);
	col = fract(col * 2.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
