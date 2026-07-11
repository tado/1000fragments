uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.20 + jf * 4.0), cos(t * 0.52 * jf)) * 0.38;
        xs += sin(length(p - im) * 131.35 - t * 7.05 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.37, 0.02, 0.26), vec3(0.89, 0.51, 0.54), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
