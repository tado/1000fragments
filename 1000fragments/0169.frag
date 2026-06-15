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
        vec2 im = vec2(sin(t * 0.68 + jf * 4.0), cos(t * 0.18 * jf)) * 0.74;
        xs += sin(length(p - im) * 60.89 - t * 4.83 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.53;
	p = abs(p) - 0.75;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.34 + time * 0.21, vec3(0.53, 0.46, 0.53), vec3(0.35, 0.44, 0.45), vec3(0.79, 1.12, 0.94), vec3(0.11, 0.15, 0.28));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
