uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.00 + t * 3.85 + ph) + sin(p.y * 8.51 - t * 3.62 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.01;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.10, 0.78, 1.49) + vec3(0.21, 0.23, 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
