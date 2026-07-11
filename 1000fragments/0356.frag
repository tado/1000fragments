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
        vec2 im = vec2(sin(t * 0.56 + jf * 4.0), cos(t * 0.23 * jf)) * 0.93;
        xs += sin(length(p - im) * 156.11 - t * 7.40 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.55;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.58 + time * 0.20, vec3(0.49, 0.53, 0.59), vec3(0.35, 0.39, 0.32), vec3(1.01, 1.01, 1.31), vec3(0.29, 0.07, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
