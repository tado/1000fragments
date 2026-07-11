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
        vec2 im = vec2(sin(t * 0.94 + jf * 4.0), cos(t * 0.27 * jf)) * 0.30;
        xs += sin(length(p - im) * 97.89 - t * 9.59 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.61, 0.09) * sin(length(p) * 4.13 - time * 1.53) * 0.17;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.20, vec3(0.49, 0.57, 0.46), vec3(0.44, 0.49, 0.41), vec3(1.04, 0.85, 1.15), vec3(0.89, 0.63, 0.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
