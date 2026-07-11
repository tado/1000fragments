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
        vec2 im = vec2(sin(t * 0.89 + jf * 4.0), cos(t * 0.38 * jf)) * 0.44;
        xs += sin(length(p - im) * 141.66 - t * 4.13 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.59;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.03, vec3(0.60, 0.42, 0.41), vec3(0.49, 0.34, 0.39), vec3(0.96, 1.20, 1.15), vec3(0.97, 0.31, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
