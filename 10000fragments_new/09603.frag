uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.51 + jf * 4.0), cos(t * 0.23 * jf)) * 0.32;
        xs += sin(length(p - im) * 195.00 - t * 11.65 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.11;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.40, 0.55, 0.18) * (0.18 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
