uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.95 + jf * 4.0), cos(t * 0.59 * jf)) * 0.44;
        xs += sin(length(p - im) * 191.36 - t * 8.64 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.86;
	p = fract(p * 2.57) - 0.5;
	p = abs(p) - 0.54;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.01, vec3(0.53, 0.57, 0.48), vec3(0.31, 0.44, 0.31), vec3(1.24, 1.01, 1.01), vec3(0.18, 0.86, 0.28));
	col = mod(col * 2.50, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
