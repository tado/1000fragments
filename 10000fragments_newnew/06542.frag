uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.62 + sin(p.y * 5.67 + t * 0.56) * 2.00 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 5.95 * sin(t * 0.72) + t * 3.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	p = sin(p * 2.64 + time * 1.19) * 1.09;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.50; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.81);
	float d = d1 + d2;
	vec3 col = palette(d * 0.82 + time * 0.22, vec3(0.52, 0.51, 0.51), vec3(0.35, 0.32, 0.37), vec3(0.77, 0.77, 1.04), vec3(0.32, 0.67, 0.53));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
