uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.01 + sin(p.y * 1.23 + t * 3.60) * 4.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.15;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.10, vec3(0.54, 0.57, 0.47), vec3(0.48, 0.38, 0.40), vec3(0.99, 1.23, 0.91), vec3(0.78, 0.00, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
