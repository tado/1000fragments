uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.15 - t * 8.02 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.00, vec3(0.49, 0.53, 0.54), vec3(0.42, 0.35, 0.40), vec3(0.99, 1.10, 1.01), vec3(0.41, 0.18, 0.02));
	col = fract(col * 1.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
