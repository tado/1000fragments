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
        vec2 im = vec2(sin(t * 0.86 + jf * 4.0), cos(t * 0.44 * jf)) * 0.61;
        xs += sin(length(p - im) * 68.23 - t * 9.38 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.20, vec3(0.51, 0.56, 0.50), vec3(0.36, 0.49, 0.42), vec3(1.01, 1.13, 1.37), vec3(0.93, 0.98, 0.88));
	col = fract(col * 1.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
