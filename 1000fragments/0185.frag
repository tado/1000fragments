uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.14 + sin(p.y * 4.20 + t * 0.57) * 1.93 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.88) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.02, vec3(0.56, 0.42, 0.46), vec3(0.32, 0.38, 0.40), vec3(1.15, 1.17, 1.00), vec3(0.92, 0.52, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
