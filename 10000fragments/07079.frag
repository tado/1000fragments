uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 6.87 - t * 3.28 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.86;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.26, 0.33, 0.34), vec3(0.60, 0.97, 0.43), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
