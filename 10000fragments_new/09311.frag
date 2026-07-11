uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.79 + sin(p.y * 4.05 + t * 5.16) * 4.23 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.34, 0.14, 0.02), vec3(0.78, 0.75, 0.86), d);
	col = mod(col * 2.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
