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
        vec2 im = vec2(sin(t * 0.65 + jf * 4.0), cos(t * 0.58 * jf)) * 0.84;
        xs += sin(length(p - im) * 195.11 - t * 9.84 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.54 + time * 0.24, vec3(0.45, 0.48, 0.55), vec3(0.40, 0.40, 0.31), vec3(1.12, 1.03, 1.21), vec3(0.72, 0.88, 0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
