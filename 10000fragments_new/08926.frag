uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.56 + sin(p.y * 2.18 + t * 1.91) * 3.98 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 3.12 * sin(t * 1.03) + t * 2.65 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.52;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.54);
	float d = d1 + d2;
	vec3 col = palette(d * 1.76 + time * 0.20, vec3(0.41, 0.45, 0.44), vec3(0.37, 0.50, 0.47), vec3(0.98, 1.20, 0.89), vec3(0.13, 0.41, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
