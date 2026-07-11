uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.46 + jf * 4.0), cos(t * 0.28 * jf)) * 0.60;
        xs += sin(length(p - im) * 199.42 - t * 6.38 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.60), field(p, time, 1.21));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
