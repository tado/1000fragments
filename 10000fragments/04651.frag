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
        vec2 im = vec2(sin(t * 0.82 + jf * 4.0), cos(t * 0.28 * jf)) * 0.48;
        xs += sin(length(p - im) * 119.40 - t * 11.94 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.07) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.23, vec3(0.58, 0.54, 0.50), vec3(0.47, 0.40, 0.39), vec3(1.27, 0.96, 1.35), vec3(0.97, 0.39, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
