uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.00 + sin(p.y * 4.49 + t * 3.91) * 1.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.10, vec3(0.59, 0.41, 0.48), vec3(0.49, 0.40, 0.42), vec3(1.17, 0.91, 0.74), vec3(0.98, 0.34, 0.39));
	col = mod(col * 2.16, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
