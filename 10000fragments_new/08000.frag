uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.83 + jf * 4.0), cos(t * 0.54 * jf)) * 0.43;
        xs += sin(length(p - im) * 195.33 - t * 7.44 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.81;
	p = (floor(p * 26.9) + 0.5) / 26.9;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.25, vec3(0.40, 0.50, 0.58), vec3(0.36, 0.34, 0.47), vec3(1.35, 0.98, 1.38), vec3(0.46, 0.12, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
