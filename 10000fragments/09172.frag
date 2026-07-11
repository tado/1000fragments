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
        vec2 im = vec2(sin(t * 0.51 + jf * 4.0), cos(t * 0.43 * jf)) * 0.37;
        xs += sin(length(p - im) * 85.12 - t * 12.70 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.15, vec3(0.57, 0.55, 0.46), vec3(0.38, 0.42, 0.44), vec3(1.19, 1.30, 1.40), vec3(0.51, 0.12, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
