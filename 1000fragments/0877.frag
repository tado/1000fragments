uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.79 + jf * 4.0), cos(t * 0.18 * jf)) * 0.83;
        xs += sin(length(p - im) * 147.23 - t * 5.14 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.71;
	p = abs(p) - 0.46;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.60, 1.12, 1.19) + vec3(0.07, 0.05, 0.24);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
