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
        vec2 im = vec2(sin(t * 0.25 + jf * 4.0), cos(t * 0.45 * jf)) * 0.96;
        xs += sin(length(p - im) * 205.61 - t * 12.22 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.01 + t * 2.62 + ph) + sin(p.y * 12.45 - t * 1.41 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.88;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.86);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.42 + time * 0.28, vec3(0.52, 0.48, 0.56), vec3(0.31, 0.38, 0.41), vec3(0.79, 1.37, 0.82), vec3(0.64, 0.62, 0.93));
	col = mod(col * 2.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
