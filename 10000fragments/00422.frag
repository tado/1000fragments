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
    v = sin(qa * 4.0 + qr * 5.89 * sin(t * 0.70) + t * 2.99 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.68) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 0.67 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.23) - 0.5;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.18));
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.66);
	float d = d1 + d2;
	vec3 col = palette(d * 1.04 + time * 0.01, vec3(0.54, 0.54, 0.54), vec3(0.35, 0.30, 0.46), vec3(0.87, 1.20, 1.04), vec3(0.56, 0.29, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
