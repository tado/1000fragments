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
        vec2 im = vec2(sin(t * 0.86 + jf * 4.0), cos(t * 0.29 * jf)) * 0.38;
        xs += sin(length(p - im) * 195.22 - t * 12.42 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.13 + sin(p.y * 5.33 + t * 0.58) * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.40);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.54 + time * 0.09, vec3(0.56, 0.49, 0.43), vec3(0.47, 0.46, 0.37), vec3(0.82, 1.30, 1.33), vec3(0.63, 0.83, 0.71));
	col = clamp((col - 0.5) * 1.62 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
