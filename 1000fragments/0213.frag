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
        vec2 im = vec2(sin(t * 0.26 + jf * 4.0), cos(t * 0.31 * jf)) * 0.41;
        xs += sin(length(p - im) * 103.38 - t * 11.96 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	p = abs(p) - 0.73;
	p *= 2.25;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.26, vec3(0.40, 0.59, 0.42), vec3(0.43, 0.37, 0.46), vec3(1.16, 1.19, 1.33), vec3(0.63, 0.01, 0.25));
	col = mod(col * 1.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
