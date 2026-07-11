uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.47 + jf * 4.0), cos(t * 0.21 * jf)) * 0.74;
        xs += sin(length(p - im) * 86.58 - t * 13.71 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.06, -0.95) * sin(length(p) * 2.96 - time * 2.18) * 0.26;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.56 + time * 0.01);
	col *= 0.87 + 0.10 * sin(gl_FragCoord.y * 2.45 + time * 9.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
