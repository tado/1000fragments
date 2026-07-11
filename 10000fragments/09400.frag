uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.42 + jf * 4.0), cos(t * 0.60 * jf)) * 0.66;
        xs += sin(length(p - im) * 214.47 - t * 12.25 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.24;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.38, 0.22, 0.11), vec3(0.60, 0.92, 0.44), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
