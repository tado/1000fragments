uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.18 + jf * 4.0), cos(t * 0.55 * jf)) * 0.67;
        xs += sin(length(p - im) * 157.47 - t * 8.11 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.03, 0.04, 0.56), vec3(0.87, 0.63, 0.42), d);
	col = mod(col * 1.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
