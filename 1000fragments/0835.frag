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
        vec2 im = vec2(sin(t * 0.58 + jf * 4.0), cos(t * 0.24 * jf)) * 0.52;
        xs += sin(length(p - im) * 193.76 - t * 4.47 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.28 + jf * 4.0), cos(t * 0.28 * jf)) * 0.48;
        xs += sin(length(p - im) * 137.64 - t * 11.54 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.66);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.73 + time * 0.16, vec3(0.43, 0.50, 0.55), vec3(0.36, 0.40, 0.43), vec3(1.32, 1.03, 1.05), vec3(0.55, 0.73, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
