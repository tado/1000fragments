uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.32 + t * 5.74 + ph) + sin(p.y * 9.81 - t * 1.35 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.00;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.35, 0.25, 0.11), vec3(0.80, 0.99, 0.74), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
