uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.99 + jf * 4.0), cos(t * 0.50 * jf)) * 0.67;
        xs += sin(length(p - im) * 103.07 - t * 6.35 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.80;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.19, 0.24, 0.27), vec3(0.52, 0.71, 0.58), d);
	col = fract(col * 1.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
