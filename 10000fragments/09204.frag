uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.54 + jf * 4.0), cos(t * 0.50 * jf)) * 0.77;
        xs += sin(length(p - im) * 102.47 - t * 10.44 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.57;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.31, 0.05, 0.26), vec3(0.79, 0.86, 0.82), d);
	col = mod(col * 2.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
