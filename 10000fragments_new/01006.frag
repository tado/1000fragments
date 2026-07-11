uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.96 + t * 2.04 + ph) + sin(p.y * 5.05 - t * 2.04 + ph)
        + sin((p.x + p.y) * 2.02 + t * 2.04 + ph) + sin(length(p) * 13.56 - t * 2.04 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.53, 0.57, 0.84) * (0.15 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
