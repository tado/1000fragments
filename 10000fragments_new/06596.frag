uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.94 + jf * 4.0), cos(t * 0.31 * jf)) * 0.54;
        xs += sin(length(p - im) * 76.81 - t * 13.55 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.42;
	p = fract(p * 2.09) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.42 + time * 0.00, vec3(0.48, 0.50, 0.56), vec3(0.44, 0.47, 0.43), vec3(0.91, 0.96, 1.36), vec3(0.25, 0.51, 0.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
