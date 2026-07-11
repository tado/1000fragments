uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.38 - t * 1.90 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.77 + time * 0.06, vec3(0.59, 0.48, 0.48), vec3(0.34, 0.30, 0.39), vec3(0.98, 0.79, 1.12), vec3(0.36, 0.17, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
