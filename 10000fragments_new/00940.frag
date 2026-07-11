uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.68 + t * 1.48 + ph) + sin(p.y * 12.37 - t * 1.48 + ph)
        + sin((p.x + p.y) * 2.91 + t * 1.48 + ph) + sin(length(p) * 16.54 - t * 1.48 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.17, 0.47, 0.46) * (0.07 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = fract(col * 2.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
