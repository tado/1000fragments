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
    v = sin(qa * 4.0 + qr * 6.66 * sin(t * 0.87) + t * 3.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.04, vec3(0.52, 0.46, 0.46), vec3(0.41, 0.35, 0.44), vec3(1.30, 1.16, 0.89), vec3(0.70, 0.46, 0.01));
	col *= 0.83 + 0.14 * sin(gl_FragCoord.y * 1.55 + time * 15.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
