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
        vec2 im = vec2(sin(t * 0.32 + jf * 4.0), cos(t * 0.29 * jf)) * 0.49;
        xs += sin(length(p - im) * 129.29 - t * 7.13 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.93;
	p = fract(p * 2.64) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.20, vec3(0.48, 0.59, 0.52), vec3(0.44, 0.46, 0.39), vec3(1.09, 1.24, 0.99), vec3(0.21, 0.50, 0.88));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
