uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.75 - t * 5.19 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 3.63 * sin(t * 0.50) + t * 2.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.52));
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.53);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.64 + time * 0.21, vec3(0.55, 0.58, 0.49), vec3(0.47, 0.46, 0.41), vec3(0.94, 1.20, 1.30), vec3(0.93, 0.94, 0.29));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
