uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.10 + sin(p.y * 3.25 + t * 1.93) * 1.74 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.69;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.35, 0.31), vec3(0.54, 0.80, 0.95), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
