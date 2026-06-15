uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.24 + jf * 4.0), cos(t * 0.53 * jf)) * 0.73;
        xs += sin(length(p - im) * 165.39 - t * 8.31 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.60;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.29, 0.45, 0.13), vec3(0.79, 0.67, 0.53), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
