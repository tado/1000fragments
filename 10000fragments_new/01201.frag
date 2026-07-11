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
    v = sin(qa * 11.0 + qr * 4.83 * sin(t * 0.90) + t * 3.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.39;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.87 + time * 0.06, vec3(0.41, 0.47, 0.57), vec3(0.43, 0.45, 0.43), vec3(0.73, 0.97, 1.32), vec3(0.14, 0.65, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
