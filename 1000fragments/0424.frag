uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.70 + jf * 4.0), cos(t * 0.55 * jf)) * 0.97;
        xs += sin(length(p - im) * 217.26 - t * 12.37 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.26, vec3(0.60, 0.50, 0.60), vec3(0.37, 0.33, 0.48), vec3(1.00, 1.31, 0.86), vec3(0.92, 0.09, 0.34));
	col = mod(col * 1.36, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
