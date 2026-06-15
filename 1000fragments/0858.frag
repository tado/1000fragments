uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.68 + jf * 4.0), cos(t * 0.44 * jf)) * 0.67;
        xs += sin(length(p - im) * 138.15 - t * 11.74 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.83;
	p += vec2(-1.00, -0.72) * sin(length(p) * 4.32 - time * 1.59) * 0.16;
	p = fract(p * 1.65) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.25, vec3(0.56, 0.40, 0.52), vec3(0.31, 0.43, 0.31), vec3(0.80, 0.72, 1.15), vec3(0.51, 0.12, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
